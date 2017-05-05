$(document).ready(function () {
    var newProjectTaskRowTemplate = Handlebars.compile($('#NewProjectTaskRow').html());

    $('table').on('click', 'a.command-button', function (event) {
        event.preventDefault();
        console.log(event, $(this).data('method'));

        var method = $(this).data('method');

        if (method === "delete") {
            $.ajax({ url: $(this).attr('href'), type: "DELETE" }).done(function (data) {
            $('#ProjectTaskRow-' + data.ProjectTaskID).remove();
            });
        }
    });

    $('#NewTaskForm').on('submit', function (event) {
        event.preventDefault();

        var url = $('#NewTaskForm').attr('action');

        var newProjectTask = {
            Description: $('#NewProjectTaskDescriptionInput').val(),
            EstimatedPomodoroCount: $('#NewProjectTaskEstimatedPomodorosInput').val(),
            ProjectID: $('#ProjectId').val()
        }

        $.post(url, newProjectTask).done(function (data) {
            
            console.log(data);
            $('#NewProjectTaskDescriptionInput').val('');
            $('#NewProjectTaskEstimatedPomodorosInput').val('');
            $('.table tbody').append(newProjectTaskRowTemplate(data));

        });

    });
});