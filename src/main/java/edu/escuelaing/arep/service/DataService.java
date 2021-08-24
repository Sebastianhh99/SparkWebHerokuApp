package edu.escuelaing.arep.service;

import org.json.JSONObject;

/**
 * Inteface for dataService
 */
public interface DataService {
    
    /**
     * Get the data fron alphavantage
     * @param symbol Symbol for the company
     * @param function Function accord to alpha
     * @return JSONObject with the data
     */
    JSONObject getDataAlpha(String symbol,String function);
}
