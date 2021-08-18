package edu.escuelaing.arep;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.HashMap;

import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

public class HttpConnectionExample {
    private static HashMap<String,JSONObject> cache = new HashMap<String,JSONObject>();
    
    public static JSONObject alphaVantage(String symbol,String function){
        String GET_URL="";
        if(function.equals("TIME_SERIES_INTRADAY")){
            GET_URL="https://www.alphavantage.co/query?function="+function+"&symbol="+symbol+"&interval=5min&apikey=W19YRZDHPLIPFXN6";    
        }else{
            GET_URL="https://www.alphavantage.co/query?function="+function+"&symbol="+symbol+"&apikey=W19YRZDHPLIPFXN6";
        }
        try {
            /*if(cache.containsKey(symbol)){
                return cache.get(symbol);
            }*/
            JSONObject json = new JSONObject(IOUtils.toString(new URL(GET_URL),Charset.forName("UTF-8")));
            //cache.put(symbol, json);
            return json;
        } catch (JSONException e) {
        } catch (MalformedURLException e){
        } catch (IOException e) {}
        return new JSONObject();
    }
}
