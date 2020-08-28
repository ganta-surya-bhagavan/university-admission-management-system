package com.cg.UniversityAdmissionSystem.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class DuplicateException extends RuntimeException {
	private static final long serialVersionUID = -1217504577499950252L;

	public DuplicateException(String msg)
	{
		super(msg);
	}

}
