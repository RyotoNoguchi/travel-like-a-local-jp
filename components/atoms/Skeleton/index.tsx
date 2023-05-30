/* eslint-disable prettier/prettier */
type Props = {
  width: number | string
  height: number | string
}
const Skeleton: React.FC<Props> = ({ width, height }) => {
  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height
  }
  return <div className="animate-pulse" style={style} />
}

export default Skeleton
