import { useState } from "react"

const Dot = ({pos}) => {
  return (
    <div style={{
      left: `${pos.x}px`,
      top: `${pos.y}px`
    }} className={`absolute w-2 h-2 rounded-full bg-dot`} />
  )
}

function App() {
  const [dots, setDots] = useState([])
  const [undo, setUndo] = useState([])
  const [redo, setRedo] = useState([])

  const HandleUndo = e => {
    e.stopPropagation()
    const last = undo.pop()
    setDots(dots.filter(dot => dot.x !== last.x && dot.y !== last.y))
    setRedo([...redo, last])
  }
  const HandlRedo = e => {
    e.stopPropagation()
    const last = redo.pop()
    setDots([...dots, last])
  }
  const addDot = e => {
    const { clientX, clientY } = e
    setDots([...dots, { x: clientX, y: clientY }])
    setUndo([...undo, { x: clientX, y: clientY }])
    setRedo([])
  }
  return (
    <div onClick={addDot} className="h-screen relative w-full bg-bg overflow-hidden fle items-center">
      <div className="w-auto h-auto p-4 flex gap-2 absolute left-0 top-0">
        <button disabled={!undo[0]?.x} onClick={HandleUndo} className="bg-dot px-10 py-4 disabled:opacity-50 cursor-pointer hover:opacity-90 text-sm font-bold tracking-wide rounded-md">Unod</button>
        <button disabled={!redo[0]?.y} onClick={HandlRedo} className="bg-dot px-10 py-4 disabled:opacity-50 cursor-pointer hover:opacity-90 text-sm font-bold tracking-wide rounded-md">Redo</button>
      </div>
      {dots.map((pos, kxd) => <Dot pos={pos} key={kxd}/>)}
    </div>
  );
}

export default App;
