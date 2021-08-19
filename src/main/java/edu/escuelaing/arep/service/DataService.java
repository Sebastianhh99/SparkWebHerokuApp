package edu.escuelaing.arep.service;

import org.json.JSONObject;

public interface DataService {
    
    JSONObject getDataAlpha(String symbol,String function);
}
