import React, {useEffect , useState} from "react";
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
import memories from './images/memories.png'
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from './styles.js'
import { useDispatch } from 'react-redux';
import {getPosts} from './actions/posts'

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId,setcurrentId] = useState(null);
    useEffect(() => {
        dispatch(getPosts());
    },[currentId,dispatch]);

    return (
        <Container maxwidth='lg'>
            <AppBar className={classes.appBar} position='static' color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setcurrentId={setcurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setcurrentId={setcurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    );
}

export default App