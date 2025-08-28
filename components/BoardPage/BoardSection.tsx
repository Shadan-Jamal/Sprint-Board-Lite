import Navbar from "../Navbar"
import Todo from "./Todo"
import Progress from "./Progress"
import Done from "./Done"

const BoardSection = () => {
  return (
    <div className="w-full">
        <Navbar />
        <div className="w-full grid place-content-center grid-cols-3 bg-zinc-800">
            <Todo />
            <Progress />
            <Done />
        </div>
    </div>
  )
}

export default BoardSection