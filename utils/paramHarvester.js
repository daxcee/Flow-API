module.exports = {

    process:function(param){
        if(param.sortKey){
            var sortOrder = param.sortOrder;
            var sortRule = {};

            if(sortOrder)
                sortRule[param.sortKey] = sortOrder;
            else
                sortRule[param.sortKey] = "asc"; //fallback on default

            param.sortRule = sortRule;
        }

        if(param.searchTerm){
            var searchRule = {};
            searchRule[param.searchKey] = param.searchTerm;

            param.searchRule = searchRule;
        }

        return param;
    }

};