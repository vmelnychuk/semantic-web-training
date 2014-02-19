/**
 * 
 */
var first_ticket_subclass;
var get_first_ticket_subclass = function() {
$.ajax({
	url : 'http://localhost:8080/openrdf-sesame/repositories/ticket_01',
	type : 'get',
	data : {
		queryLn : 'SPARQL',
		query : "SELECT ?tickets WHERE { ?tickets rdfs:subClassOf ticket:GenericTicket }",
		limit : 'none',
		infer : 'true',
		Accept : 'application/sparql-results+json'
	},
	dataType : 'json',
	success : function(data) {
		first_ticket_subclass = data;
	}
});
};