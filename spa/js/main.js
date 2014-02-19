/**
 * 
 */

var ticketApp = {
	first_ticket_subclass : {},
	second_ticket_subclass : {},
	third_ticket_subclass : {},
	sub_class_name : "GenericTicket"
}
var get_ticket_subclass = function() {

	var spqrql_query = "PREFIX ticket:<http://training.org/2014/02/ticket#>"
			+ "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>"
			+ " SELECT ?tickets WHERE { ?tickets rdfs:subClassOf " 
			+ "ticket:"
			+ ticketApp.sub_class_name + " }";
	$.ajax({
		url : 'http://localhost:8080/openrdf-sesame/repositories/ticket_01',
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
			ticketApp.first_ticket_subclass = data;
		}
	});
};

var add_cell_to_results_table = function(text) {
	var table = document.getElementById('results-table');
	var new_row = table.insertRow(table.rows.length);
	var new_cell = new_row.insertCell(0);
	new_cell.innerHTML = text;
}

var bulid_results_table = function() {
	var array_of_result = ticketApp.first_ticket_subclass["results"]["bindings"];
	var length = array_of_result.length;

	for (var i = 0; i < length; i++) {
		text = array_of_result[i]["tickets"]["value"];
		text = text.split("#")[1];

		text = "<a href=" + "\"#" + text + "\"" + ">" + text + "</a>";
		add_cell_to_results_table(text);
	}
}

var change_sub_class = function(text) {
	text = text.substring(1, text.length - 1);
	ticketApp.sub_class_name = text;
}