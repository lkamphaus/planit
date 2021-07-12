import {useRouter} from 'next/router';
import mockData from '../../../../MockData/EventData.js';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styles from '../../../styles/Event.module.css';

const event = () => {
  const router = useRouter()
  const {id} = router.query
  const test = mockData.SingleEventData[1];
  console.log(id)
  return (
  <div className={styles.container}>
    <div className={styles.photo}>
      <image>
        test
      </image>
      <div>
        <input
          className={styles.hidden}
          id="contained-button-file"
          multiple
          type="file"
          />
        <label htmlFor="contained-button-file">

          <Button variant="contained" color="primary" component="span">  Upload
          </Button>
        </label>
      </div>
    </div>
    <div className={styles.mainsection}>
      <div className={styles.col1}>
        <div className={styles.nameInfo}>
          <h1>
            {test.name}
          </h1>
          <div className={styles.flexrows}>
            <h2>
              <a href="/">Status</a>
            </h2>
            <h2>
              <a href="/">location</a>
            </h2>
          </div>
        </div>
        <Button variant="contained" color="primary" component="span">
          Copy to Clipboard
        </Button>
      </div>
      <div className={styles.col2}>
        <div className={styles.desBox}>
          <h3>Description</h3>
          <p>{test.description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch
// }

export default event