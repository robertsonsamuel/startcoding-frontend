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
