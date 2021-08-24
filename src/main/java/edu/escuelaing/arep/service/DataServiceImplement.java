package edu.escuelaing.arep.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.HashMap;

import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementacion for DataService
 */
public class DataServiceImplement implements DataService{
    private static HashMap<String,HashMap<String,JSONObject>> cache = new HashMap<String,HashMap<String,JSONObject>>();
    private static HashMap<String,HashMap<String,LocalDateTime>> cacheDate = new HashMap<String,HashMap<String,LocalDateTime>>();

    /**
     * Updates the cache 
     */
    private JSONObject updateCache(String symbol,String function, String GET_URL) throws JSONException, MalformedURLException, IOException{
        JSONObject json = new JSONObject(IOUtils.toString(new URL(GET_URL),Charset.forName("UTF-8")));
        cache.get(function).put(symbol, json);
        cacheDate.get(function).put(symbol, LocalDateTime.now());
        return json;
    }

    /**
     * Get the Data Information
     */
    public JSONObject getDataAlpha(String symbol,String function){
        String GET_URL="";
        if(function.equals("TIME_SERIES_INTRADAY")){
            GET_URL="https://www.alphavantage.co/query?function="+function+"&symbol="+symbol+"&interval=5min&apikey=W19YRZDHPLIPFXN6";    
        }else{
            GET_URL="https://www.alphavantage.co/query?function="+function+"&symbol="+symbol+"&apikey=W19YRZDHPLIPFXN6";
        }
        try {
            if(cache.containsKey(function)){
                if(cache.get(function).containsKey(symbol)){
                    if(cacheDate.get(function).get(symbol).compareTo(LocalDateTime.now().minusMinutes(20))<0){
                        return cache.get(function).get(symbol);
                    }else{
                        return updateCache(symbol, function, GET_URL);
                    }
                }else{
                    return updateCache(symbol, function, GET_URL);
                }
            }else{
                JSONObject json = new JSONObject(IOUtils.toString(new URL(GET_URL),Charset.forName("UTF-8")));
                cache.put(function, new HashMap<String,JSONObject>());
                cache.get(function).put(symbol, json);
                cacheDate.put(function, new HashMap<String,LocalDateTime>());
                cacheDate.get(function).put(symbol, LocalDateTime.now());
                return json;
            }
        } catch (JSONException e) {
        } catch (MalformedURLException e){
        } catch (IOException e) {}
        return new JSONObject();
    }
}
