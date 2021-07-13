
const OptionsButton = (props) => {
  console.log(props.time)
  let time = new Date (parseInt(props.time))
  console.log(time)
  return (
    <>
    <button>
      {time.toString()}
    </button>
    </>
  )
}

export default OptionsButton;