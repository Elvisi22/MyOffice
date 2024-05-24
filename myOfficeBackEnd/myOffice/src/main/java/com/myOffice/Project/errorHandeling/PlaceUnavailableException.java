package com.myOffice.Project.errorHandeling;

public class PlaceUnavailableException extends RuntimeException {
    public PlaceUnavailableException(String message) {
        super(message);
    }
}