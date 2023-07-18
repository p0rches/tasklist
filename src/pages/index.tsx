import dayjs from "dayjs";
import Head from "next/head";
import { useState } from "react";

interface Task {
  content: string;
  checked: boolean;
  createdAt: string;
}

export default function Home() {
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = () => {
    if (item !== "") {
      const newTask: Task = {
        content: item,
        checked: false,
        createdAt: dayjs().format("HH:mm")
      };
      setTasks([...tasks, newTask]);
      setItem("");
    }
  };

  const handleChecked = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const currTime = dayjs().format("HH:mm");

  return (
    <>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="container">
          <h1 className="font-extrabold text-slate-900 text-5xl">Tasks</h1>
          <div className="text-slate-600">{`Last updated: ${currTime}`}</div>
          {tasks.length === 0 && (
            <div className="pt-2">
              <div className="italic">No tasks...</div>
            </div>
          )}
          {tasks.length > 0 && (
            <div className="py-2 pl-2">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="flex flex-row items-center gap-2 text-2xl"
                >
                  <input
                    type="checkbox"
                    checked={task.checked}
                    className="w-4 h-4 bg-slate-100 border-slate-300 rounded-lg"
                    onChange={() => handleChecked(idx)}
                  />
                  <div
                    className={
                      task.checked
                        ? "line-through text-slate-500"
                        : "text-slate-900"
                    }
                  >
                    {task.content}
                  </div>
                  <div className="text-sm text-white hover:text-slate-600">
                    {`Created: ${task.createdAt}`}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="border-t max-w-fit py-2">
            <input
              placeholder="Enter a task"
              className="border-none text-2xl text-slate-900 outline-none"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="p-2 bg-slate-200 shadow-2xl rounded-xl"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

