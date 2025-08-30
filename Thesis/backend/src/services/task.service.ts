// @ts-nocheck
import { UserDTO } from "../DTO/userDTO";
import { TaskStatus } from "../enums/TaskStatus";
import Task, { ITask } from "../models/task";
import User, { IUser } from "../models/user";
import TaskHistory, { ITaskHistory } from "../models/taskHistory";
import { TaskHistoryActions } from "../enums/TaskHistoryActions";
import category from "../models/category";
import { UserRole } from "../enums/UserRole";

const getAllTasks = async (userDTO: UserDTO): Promise<ITask[]> => {
  const filter = userDTO.role === UserRole.ADMIN ? {} : { users: userDTO.id };

  return await Task.find(filter).populate("category_id").populate({
    path: "users",
    select: "id firstName lastName",
  });
};

const createUpdate = async (
  taskData: any,
  userDTO: UserDTO
): Promise<ITask> => {
  const taskPayload = {
    ...taskData,
    users: taskData.assignees.map(
      (user: { value: string; label: string }) => user.value
    ),
  };

  if (taskPayload._id) {
    // Find the existing task
    const existingTask = await Task.findById(taskPayload._id)
      .populate("category_id")
      .populate({
        path: "users",
        select: "id firstName lastName",
      });
    if (!existingTask) {
      throw new Error("Task not found");
    }

    if (
      existingTask.acceptedBy &&
      !taskPayload.users.includes(String(existingTask.acceptedBy))
    ) {
      // If the accepted user is not in the updated users list
      taskPayload.status = TaskStatus.OPEN; // Set status to 'open'
      taskPayload.acceptedBy = null; // Set acceptedBy to null
    }

    // Exclude status from the payload to prevent overriding it during an update
    const changes = findTaskDifferences(existingTask, taskPayload);

    for (const key of Object.keys(changes)) {
      await createHistory(
        taskPayload._id, // Assuming taskPayload contains _id as task identifier
        userDTO.id,
        TaskHistoryActions.UPDATE,
        key, // Store the property that was updated
        changes[key].oldTaskValue, // Store the old value
        changes[key].newTaskValue // Store the new value
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskPayload._id,
      { ...taskPayload, category_id: taskPayload.category_id.value }, // Update without status field
      {
        new: true,
      }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } else {
    // Set status to 'open' for new tasks
    const newTaskPayload = {
      ...taskPayload,
      status: TaskStatus.OPEN, // Set status to 'open' on create
      category_id: taskPayload.category_id.value,
    };

    const newTask = new Task(newTaskPayload);

    const task = await newTask.save();

    await createHistory(
      task._id,
      userDTO.id,
      TaskHistoryActions.CREATE,
      "",
      "",
      ""
    );

    return task;
  }
};

const acceptTask = async (id: string, userDTO: UserDTO) => {
  const task = (await Task.findById(id)) as ITask;
  if (task) {
    task.acceptedBy = userDTO.id;
    task.status = TaskStatus.IN_PROGRESS;
    await task.save();

    await createHistory(
      task._id,
      userDTO.id,
      TaskHistoryActions.ACCEPT,
      "",
      "",
      ""
    );
  }
};

const completeTask = async (id: string, userDTO: UserDTO) => {
  const task = (await Task.findById(id)) as ITask;
  if (task) {
    task.acceptedBy = userDTO.id;
    task.status = TaskStatus.COMPLETED;
    await task.save();

    await createHistory(
      task._id,
      userDTO.id,
      TaskHistoryActions.COMPLETE,
      "",
      "",
      ""
    );
  }
};

const approveTask = async (id: string, userDTO: UserDTO) => {
  const task = (await Task.findById(id)) as ITask;
  if (task) {
    task.acceptedBy = userDTO.id;
    task.status = TaskStatus.APPROVED;
    await task.save();

    await createHistory(
      task._id,
      userDTO.id,
      TaskHistoryActions.APPROVE,
      "",
      "",
      ""
    );
  }
};

const rejectTask = async (id: string, userDTO: UserDTO) => {
  const task = (await Task.findById(id)) as ITask;
  if (task) {
    task.acceptedBy = userDTO.id;
    task.status = TaskStatus.REJECTED;
    task.acceptedBy = null;
    await task.save();

    await createHistory(
      task._id,
      userDTO.id,
      TaskHistoryActions.REJECT,
      "",
      "",
      ""
    );
  }
};

export const getTask = async (id: string) => {
  return await Task.findOne({
    _id: id,
  })
    .populate("category_id")
    .populate({
      path: "users",
      select: "id firstName lastName",
    });
};

const deleteTask = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};

const createHistory = async (
  taskId: string,
  userId: string | null,
  action: TaskHistoryActions,
  property?: string,
  oldValue?: string,
  newValue?: string
) => {
  const historyEntry = new TaskHistory({
    task: taskId,
    action,
    user: userId,
    property,
    oldValue,
    newValue,
  });
  await historyEntry.save();
};

const findTaskDifferences = (existingTask: ITask, taskPayload: any) => {
  const changes: { [key: string]: { oldTaskValue: any; newTaskValue: any } } =
    {};

  if (existingTask.title !== taskPayload.title) {
    changes["name"] = {
      oldTaskValue: existingTask.title,
      newTaskValue: taskPayload.title,
    };
  }

  if (existingTask.description !== taskPayload.description) {
    changes["description"] = {
      oldTaskValue: existingTask.description,
      newTaskValue: taskPayload.description,
    };
  }

  if (existingTask.description !== taskPayload.description) {
    changes["description"] = {
      oldTaskValue: existingTask.description,
      newTaskValue: taskPayload.description,
    };
  }

  if (existingTask.criticality !== taskPayload.criticality) {
    changes["criticality"] = {
      oldTaskValue: existingTask.criticality,
      newTaskValue: taskPayload.criticality,
    };
  }

  if (existingTask.category_id.name !== taskPayload.category_id.label) {
    changes["category"] = {
      oldTaskValue: existingTask.category_id.name,
      newTaskValue: taskPayload.category_id.label,
    };
  }

  if (
    new Date(existingTask.date).getDate() !==
    new Date(taskPayload.date).getDate()
  ) {
    changes["date"] = {
      oldTaskValue: existingTask.date,
      newTaskValue: taskPayload.date,
    };
  }

  if (
    existingTask.users
      .map((user) => `${user.firstName} ${user.lastName}`)
      .join(", ") !== taskPayload.assignees.map((user) => user.label).join(", ")
  ) {
    changes["assignees"] = {
      oldTaskValue: existingTask.users
        .map((user) => `${user.firstName} ${user.lastName}`)
        .join(", "),
      newTaskValue: taskPayload.assignees.map((user) => user.label).join(", "),
    };
  }

  return changes;
};

export const getTaskHistory = async (id: string) => {
  return await TaskHistory.find({
    task: id,
  }).populate({
    path: "user",
    select: "id firstName lastName",
  });
};

const addTaskComment = async (
  task: string,
  comment: string,
  userDTO: UserDTO
) => {
  await createHistory(
    task,
    userDTO.id,
    TaskHistoryActions.COMMENT,
    "comment",
    comment,
    ""
  );
};

export const taskService = {
  getAllTasks,
  getTask,
  createUpdate,
  acceptTask,
  completeTask,
  approveTask,
  rejectTask,
  deleteTask,
  getTaskHistory,
  addTaskComment,
};
