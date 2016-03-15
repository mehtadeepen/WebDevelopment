(function(){
    angular
        .module("divSortable", [])
        .directive("divSortable", divSortable);

    function divSortable(FieldService) {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var divAxis = attributes.divAxis;
            $(element).sortable({
                axis: divAxis,
                handle: '.handle',
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                    FieldService.reorderFields(scope.model.fields,scope.model.form._id).then(function(response){
                        if(response.data) {
                                console.log("Reordering Successful ...");
                                console.log(response.data);
                        }
                    });
                }
            });
        }
        return {
            link: link
        }
    }
})();