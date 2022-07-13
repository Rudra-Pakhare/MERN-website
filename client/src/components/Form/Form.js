import React, {useState,useEffect} from 'react'
import useStyles from './styles.js'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { createPost , updatePost } from '../../actions/posts.js';

const Form = ({currentId,setcurrentId}) => {
    const classes = useStyles();
    const [postData , setpostData] = useState({
      creator:'' , title:'', message:'' , tags:'' , selectedFile:'',
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(()=>{
      if(post) setpostData(post);
    },[post])

    const handleSubmit = (event)=>{
      event.preventDefault();

      if(currentId){
        dispatch(updatePost(currentId,postData));
        clear();
      }
      else {
        dispatch(createPost(postData));
        clear();
      }
    };

    const clear = ()=>{
      setcurrentId(null);
      setpostData({creator:'' , title:'', message:'' , tags:'' , selectedFile:'',});
    };

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      
      <Typography variant='h6'>{currentId ? 'Editing' :'Creating'} a Memory</Typography>

      <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(event)=>{setpostData({...postData , creator:event.target.value})}} />
      <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(event)=>{setpostData({...postData , title:event.target.value})}} />
      <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(event)=>{setpostData({...postData , message:event.target.value})}} />
      <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(event)=>{setpostData({...postData , tags:event.target.value.split(',')})}} />
      
      <div className={classes.fileInput}>
        <FileBase type='file' multiple={false} onDone={ ({base64}) => setpostData({...postData , selectedFile: base64})}/>
      </div>
      
      <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
      <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      
      </form>
    </Paper>
  )
}

export default Form