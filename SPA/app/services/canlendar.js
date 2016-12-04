function enter(bookings) {

	var currentDate = new Date()
	var events = [];
	for (i = 0; i < bookings.length; i++) {
		events.push({ book_id: bookings[i].book_id, title: bookings[i].purpose, start: new Date(bookings[i].start_time), end: new Date(bookings[i].end_time), color: 'green' });
	}

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		timezone: 'Asia/Hong_Kong',
		defaultDate: currentDate,
		eventLimit: true, // allow "more" link when too many events

		eventClick: function (calEvent, jsEvent, view) {
			var myBookId = calEvent._id;
			var myBookID_clicked = myBookId.slice(3);
			$(".modal-body #bookId").val(events[myBookID_clicked - 1].book_id);
			$("#confirm-delete").modal();
		},
		events
	});
}