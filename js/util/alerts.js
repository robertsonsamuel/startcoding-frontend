import swal from 'sweetalert';
const connectionErrorMsg = `Looks like you've been...
                            (•_•) /  \n
                            ( •_•)>⌐■-■ / \n
                            (⌐■_■)
                            disconnected..YEAAHHHH!`;


export function confirmDelete(cb) {
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this.",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: true
  }, function() {
      cb();
  });
}

export function LoginError(text){
  swal({
    title:"Login Error",
    text:text || connectionErrorMsg,
    type:'error'
  });
}

export function RegisterError(text){
  swal({
    title:"Registration Error",
    text:text || connectionErrorMsg,
    type:'error'
  });
}

export function genErr(text) {
  swal({
    title:"Error",
    text:text || connectionErrorMsg,
    type:'error'
  });
}

export function pleaseLogin() {
  swal({
    title:"You shall not pass. Please log in or register!",
    text:"<img src='http://i.imgur.com/hnwNX2L.gif' width='300px'>",
    html:true
  });
}
