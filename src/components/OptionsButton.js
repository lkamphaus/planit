
const OptionsButton = (props) => {
  let time = new Date (parseInt(props.time))
  return (
    <>
    <button>
      {time.toString()}
    </button>
    </>
  )
}

export default OptionsButton;