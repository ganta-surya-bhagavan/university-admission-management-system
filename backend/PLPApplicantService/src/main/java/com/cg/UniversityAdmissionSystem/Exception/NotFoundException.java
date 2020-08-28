package com.cg.UniversityAdmissionSystem.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
	
	
	private static final long serialVersionUID = -6949535657788075531L;

	public NotFoundException(String msg)
	{
		super(msg);
	}

}
