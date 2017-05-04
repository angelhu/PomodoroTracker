$(document).ready(function () {
    $('#NewProjectForm').on('submit', function (event) {
        event.preventDefault();

        var newProjectDescription = $('#NewProjectDescriptionInput').val();

        //Post the new description to our API.
        $.post('/api/projectsapi', { Description: newProjectDescription })
            .done(function (data) {
                var newProjectId = data.ProjectID;
                var newProjectEditLink = '<a href="/Projects/Edit/' + newProjectId + '">Edit</a>';
                var newProjectDetailsLink = '<a href="/Projects/Details/' + newProjectId + '">Details</a>';
                var newProjectDeleteLink = '<a href="/Projects/Delete/' + newProjectId + '">Delete</a>';

                $('.table tbody').append('<tr><td>' + newProjectDescription + '</td><td>' + newProjectEditLink + ' | ' + newProjectDetailsLink + ' | ' + newProjectDeleteLink + '</td ></tr >');
                $('#NewProjectDescriptionInput').val('');
                console.log(data);
            });
    });

    //Attach a click event handler to #NewProjectCreateButton
    $('#NewProjectCreateButton').on('click', function (event) {
        //Get the value form #NewProjectDescriptionInput
       
    });
});