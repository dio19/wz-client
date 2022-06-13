import { useEffect, useState, useCallback, useMemo } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { DataUser, MouseEventButton } from '../../types/interfaces'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

function Popup() {
    const classes = useStyles();
    const [ open, setOpen ] = useState(true);
    const [ dataUser, setDataUser ] = useState<DataUser | undefined>(undefined);

    const params = useParams();
    const { id } = params;

    const handleBack = (e: MouseEventButton) => {
      e.preventDefault()
      setOpen(false)
      window && window.history.back();
    };
   
    const getUserById = useCallback(async () => {
      try {
        const response = await fetch(`https://wz-server-dio.herokuapp.com/users/${id}`)
        const jsonResponse = await response.json()
        setDataUser(jsonResponse)
      } catch (e) {
        console.error(e);
      }
    }, [id]);
  
    useEffect(() => {
      getUserById();
    }, []);

    const detailDataUser = useMemo(() => {
      return (
        dataUser === undefined ? <CircularProgress /> :
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div">
            {`Name: ${dataUser.name}`}
          </Typography>
          <Typography variant="subtitle1" component="div">
            Address
          </Typography>
          <Typography variant="h6" component="div">
            {`City: ${dataUser.address.city}`}
          </Typography>
          <Typography variant="h6" component="div">
            {`Latitude: ${dataUser.address.geo.lat}`}
          </Typography>
          <Typography variant="h6" component="div">
            {`Longitude: ${dataUser.address.geo.lng}`}
          </Typography>
          <Typography variant="subtitle1" component="div">
            Company
          </Typography>
          <Typography variant="h6" component="div">
            {`Name: ${dataUser.company.name}`}
          </Typography>
          <Typography variant="h6" component="div">
            {`Catch Phrase: ${dataUser.company.catch_phrase}`}
          </Typography>
          <Typography variant="h6" component="div">
            {`bs: ${dataUser.company.bs}`}
          </Typography>
        </div>
      )
    }, [dataUser]);

    return (
      <Dialog open={open} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
          <DialogTitle className={classes.dialogTitle}>
              <div style={{ display: 'flex' }}>
                  <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
                      Details of User
                  </Typography>
                  <Button
                    className={`${classes.root} ${classes.secondary}`}
                    onClick={handleBack}
                  >
                    <CloseIcon />
                  </Button>
              </div>
          </DialogTitle>
          <DialogContent dividers>
          {
            detailDataUser
          }
          </DialogContent>
      </Dialog>
    )
}

export default (Popup);