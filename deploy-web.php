<?php
	require('deploy-tokens.php');
	require('deploy-commands.php');

	$LOG_FILE = dirname(__FILE__) . "/logs/" . date("Y_m_d-H_i_s") . ".log";

	function getHeader() {
		return '<!DOCTYPE HTML>
				<html lang="en-US">
					<head>
						<meta charset="UTF-8">
						<title>GIT DEPLOYMENT SCRIPT</title>
					</head>
					<body style="background-color: #000000; 
					             color: #FFFFFF;
					             font-weight: bold; 
					             padding: 0 10px;">
						<pre>
 .  ____  .    ____________________________
 |/      \|   |                            |
[| <span style="color: #FF0000;">&hearts;    &hearts;</span> |]  | Git Deployment Script v0.1 |
 |___==___|  /              &copy; oodavid 2012 |
              |____________________________|
		';
	}

	function getFooter() {
		return '
					</pre>
				</body>
			</html>';
	}

	if($_GET['token'] != $deploy_web_token) {
		die(getHeader() . "<h1>WRONG TOKEN</h1>" . getFooter());
	}

	ignore_user_abort(true);
	//ini_set('output_buffering', 'off');
    ini_set('zlib.output_compression', false);
    //ini_set('implicit_flush', true);
    //ob_implicit_flush(true);
	set_time_limit(300);

	ob_start();

	$response  = getHeader(); 
	$response .= "<h1>Starting...</h1>";
	$response .= "<p>If this is running from a Github webhook, you won't see anything more.<br/>";
	$response .= "However, logs will be available in the file " . $LOG_FILE . ".</p>";

	echo $response; // send the response

	header('Connection: close');
	header('Content-Length: '.ob_get_length());
	ob_end_flush();
	ob_flush();
	flush();

	/**
	 * GIT DEPLOYMENT SCRIPT
	 *
	 * Used for automatically deploying websites via github or bitbucket, more deets here:
	 *
	 *		https://gist.github.com/1809044
	 */

		// The commands
		$commands = $deploy_web_commands; 

		// Run the commands for output
		foreach($commands AS $command){
			ob_start();
			$output = '';
			$output .= "<span style=\"color: #6BE234;\">\$ </span><span style=\"color: #729FCF;\">{$command}\n</span>";
			
			echo $output;
			system($command);

			file_put_contents($LOG_FILE, file_get_contents($LOG_FILE) . ob_get_contents());
			ob_end_flush();
			ob_flush();
			flush();
		}

	echo getFooter();

?>
