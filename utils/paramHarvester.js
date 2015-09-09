module.exports = {

    process:function(req, searchKey){

        var params = {};

        if(req.query.hasOwnProperty("token")){
            params["token"] = req.query.token;
        }

        if(req.query.hasOwnProperty("limit")){
            params["limit"] = req.query.limit;
        }

        if(req.query.hasOwnProperty("offset")){
            params["offset"] = req.query.offset;
        }

        if(req.query.hasOwnProperty("order")){
            var sortOrder = req.query.order;
            var sortRule = {};

            if(sortOrder)
                sortRule[req.query.sort] = sortOrder;
            else
                sortRule[req.query.sort] = "asc"; //fallback on default

            req.sortRule = sortRule;
        }

        if(req.query.hasOwnProperty("fields")){
            params["fields"]= req.query.fields.replace(/,/g, " ");
        }

        if(req.params.hasOwnProperty("id")){

            var searchRule = {};
            searchRule[searchKey] = req.params.id;

            params["searchRule"] = searchRule;
        }

        console.log("processed params: " + JSON.stringify(params));

        return params;
    }

};