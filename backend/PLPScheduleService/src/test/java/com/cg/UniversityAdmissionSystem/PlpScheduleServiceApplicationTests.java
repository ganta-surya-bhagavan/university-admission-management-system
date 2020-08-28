package com.cg.UniversityAdmissionSystem;

import java.net.URI;
import java.net.URISyntaxException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlpScheduleServiceApplicationTests {

	@LocalServerPort
	int randomServerPort;
	@Test
	public void testGetScheduleSuccess() throws URISyntaxException {
		RestTemplate restTemplate = new RestTemplate();
		final String url = "http://localhost:"+randomServerPort+"/scheduleList";
		URI endPointURL = new URI(url);
		ResponseEntity<String> responseEntity = restTemplate.getForEntity(endPointURL,String.class);
		Assertions.assertEquals(200,responseEntity.getStatusCodeValue());
		Assertions.assertNotEquals("",responseEntity.getBody());
	}

}
