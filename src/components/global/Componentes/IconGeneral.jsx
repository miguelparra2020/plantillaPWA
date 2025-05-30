const IconGeneral = ({ params: { color = "currentColor", size = "40", className="bi bi-arrow-right-circle-fill", 
    viewBox="0 0 16 16",  path="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"} }) => {
    return (

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} className={className}  viewBox={viewBox}>
  <path d={path}/>
</svg>

)
}

export default IconGeneral