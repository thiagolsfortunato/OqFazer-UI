(function () {

    return {
        findPosition: function (list, id) {
            console.log(list);
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    return i;
                }
            }
        }

    }
}());