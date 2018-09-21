/**********************************************************************************************
 *	Filename	: viewproilfe - index.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	
	/* Models is a place to define data structures and methods to interact with your data store.*/		
	//viewProfile		= require('./models/vpmodel');
	
	
	/* View  is a place to manage everything the end user sees on his or her screen)*/
	//comunitcatInfo 	= require('./views/communicationInfo');
	
	/*Controller is a place to take user requests, bring data from the model and pass it back to the view*/
	EIController = require('./controllers/bmEIController');

	app.get('/appviewprofile.php',EIController.getLatestEIAcpt);
	app.post('/appviewprofile.php',EIController.getLatestEIAcpt);		
	