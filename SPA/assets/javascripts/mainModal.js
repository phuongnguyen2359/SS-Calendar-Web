function hideModal() {
    $('#myModalNorm').modal('hide');
}

function hideModalDel() {
    $('#confirm-delete').modal('hide');
}

function successModal() {
	swal({
		title: "Done!",
		type: "success",
		timer: 1000,
		showConfirmButton: false
	});
}

function errorModal() {
	swal({
		title: "Login fail",
		text: "username or password incorrect",
		type: "error",
		confirmButtonColor: "red"
				});
}