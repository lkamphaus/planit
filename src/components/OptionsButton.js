import styles from '../styles/Event.module.css';
import Button from '@material-ui/core/Button';

const OptionsButton = (props) => {
  let time = new Date (parseInt(props.time))
  return (
    <>
    <Button value={props.time} variant="contained" component="span" className={styles.test} onClick={props.handleSetTime}>
      {time.toLocaleString()}
    </Button>
    </>
  )
}

export default OptionsButton;