/**
 * 
 */

var ticketApp = {
	ticket_classes : {},
	ticket_properties : {},
	sub_class_name : "GenericTicket",
	repo_uri : "http://localhost:8080/openrdf-sesame/repositories/ticket_02"
}

var get_all_classes = function() {
	var spqrql_query = "PREFIX ticket:<http://training.org/2014/02/ticket#>"
			+ " PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>"
			+ " PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
			+ " SELECT ?class ?classLabel" + " WHERE {"
			+ " ?class rdf:type owl:Class." + " ?class rdfs:label ?classLabel."
			+ " }";
	$.ajax({
		url : ticketApp.repo_uri,
		type : 'post',
		data : {
			queryLn : 'SPARQL',
			query : spqrql_query,
			limit : 'none',
			infer : 'true',
			Accept : 'application/sparql-results+json'
		},
		dataType : 'json',
		success : function(data) {
			ticketApp.ticket_classes = data;
			show_ticket_classes();
		}
	});
};

var get_all_properties = function() {
	var spqrql_query = "PREFIX ticket:<http://training.org/2014/02/ticket#>"
			+ " PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>"
			+ " PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
			+ " SELECT DISTINCT ?property ?propertyLabel WHERE {{"
			+ "?property rdfs:domain ?class." + "ticket:"
			+ ticketApp.sub_class_name + " rdfs:subClassOf+ ?class. }"
			+ "UNION { " + "?property rdfs:domain " + "ticket:"
			+ ticketApp.sub_class_name + "." + " }"
			+ "?property rdfs:label ?propertyLabel. }";
	$.ajax({
		url : ticketApp.repo_uri,
		type : 'post',
		data : {
			queryLn : 'SPARQL',
			query : spqrql_query,
			limit : 'none',
			infer : 'true',
			Accept : 'application/sparql-results+json'
		},
		dataType : 'json',
		success : function(data) {
			ticketApp.ticket_properties = data;
			show_ticket_properties();
		}
	});
}

var show_ticket_classes = function() {
	var array_of_result = ticketApp.ticket_classes["results"]["bindings"];
	var length = array_of_result.length;
	clear_table("ticket-table");
	for (var i = 0; i < length; i++) {
		var class_lable = array_of_result[i]["classLabel"]["value"];
		var class_uri = array_of_result[i]["class"]["value"];
		text = "<a href=" + "\"" + class_uri + "\"" + ">" + class_lable
				+ "</a>";
		add_cell_to_results_table(text, "ticket-table");
	}
}

var show_ticket_properties = function() {
	var array_of_result = ticketApp.ticket_properties["results"]["bindings"];
	var length = array_of_result.length;
	clear_table("property-table");
	for (var i = 0; i < length; i++) {
		var property_uri = array_of_result[i]["property"]["value"];
		var property_name = array_of_result[i]["propertyLabel"]["value"];
		var text;
		if (property_uri.search(/date/i) != -1) {
			text = 
		} else {
			text = "<span id=" + "\"" + property_uri + "\"" + ">"
					+ property_name + "</span>";
		}
		add_cell_to_results_table(text, "property-table");
	}
}

var add_cell_to_results_table = function(text, table_name) {
	var table = document.getElementById(table_name);
	var new_row = table.insertRow(table.rows.length);
	var new_cell = new_row.insertCell(0);
	new_cell.innerHTML = text;
}

var clear_table = function(table_name) {
	var table = document.getElementById(table_name);
	var length = table.rows.length;
	for (var row = length; row > 1; --row) {
		table.deleteRow(1);
	}
}

var change_sub_class = function(text) {
	text = text.substring(1, text.length);
	text = text.split('#')[1];
	ticketApp.sub_class_name = text;
}