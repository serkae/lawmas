package com.ims.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ims.beans.InventoryItem;
import com.ims.services.InventoryItemService;

@RestController
@RequestMapping(value="/inventoryitem")
public class InventoryItemController {

	static String bucketname = "lawmas";
	@Autowired
	private InventoryItemService inventoryItemService;

	public void setInventoryItemService(InventoryItemService inventoryItemService) {
		this.inventoryItemService = inventoryItemService;
	}

	@RequestMapping(value="/create",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<InventoryItem> addItem(@RequestBody InventoryItem i){
		System.out.println("Creating: " + i.toString());
		return new ResponseEntity<InventoryItem>(inventoryItemService.createOrUpdate(i), HttpStatus.OK);
	}
	
	@RequestMapping(value="/getAll",method=(RequestMethod.GET),produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<List<InventoryItem>> getAllItems(){
		return new ResponseEntity<List<InventoryItem>>(inventoryItemService.getAll(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/update",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<InventoryItem> updateItem(@RequestBody InventoryItem i){
		System.out.println("Updating: " + i.toString());
		return new ResponseEntity<InventoryItem>(inventoryItemService.createOrUpdate(i), HttpStatus.OK);
	}
	
	@RequestMapping(value="/remove",method=(RequestMethod.POST),
			consumes=(MediaType.APPLICATION_JSON_VALUE),
			produces=(MediaType.APPLICATION_JSON_VALUE))
	public ResponseEntity<String> removeItem(@RequestBody InventoryItem i){
		inventoryItemService.remove(i);
		return new ResponseEntity<String>("true", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/upload", method = (RequestMethod.POST))
	public ResponseEntity<String> handlePictureUpload(
			@RequestParam("file") MultipartFile f) {
		
		BasicAWSCredentials awsCreds = new BasicAWSCredentials("AKIAI3MXOKNTE6DFBHAA", "SwxW8kCo0VhbxDLkS2i6n1Zn1vriO2g0rSv1o2bX");
        AmazonS3 client = AmazonS3ClientBuilder.standard()
                                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                                .withRegion(Regions.US_EAST_1)
                                .build();
        File file = new File(f.getOriginalFilename());
        
		try {
			f.transferTo(file);
            System.out.println("Uploading a new object to S3 from a file:"+f.getName()+"\n");
            client.putObject(new PutObjectRequest(
            		                 bucketname, f.getOriginalFilename(), file));

           
         } catch (AmazonServiceException ase) {
            System.out.println((("Caught an AmazonServiceException, which " +
            		"means your request made it " +
                    "to Amazon S3, but was rejected with an error response" +
                    " for some reason"+            
           "Error Message:    " + ase.getMessage() +
           " HTTP Status Code: " + ase.getStatusCode() +
            "AWS Error Code:   " + ase.getErrorCode())+
            "Error Type:       " + ase.getErrorType() +
            "Request ID:       " + ase.getRequestId()));
        } catch (AmazonClientException ace) {
        	System.out.println((("Caught an AmazonClientException, which " +
            		"means the client encountered " +
                    "an internal error while trying to " +
                    "communicate with S3, " +
                    "such as not being able to access the network." +
           "Error Message: " + ace.getMessage())));
        } catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		System.out.println("file link: https://s3.amazonaws.com/"+bucketname+"/"+f.getOriginalFilename());
		ResponseEntity<String> r = new ResponseEntity<String>("https://s3.amazonaws.com/"+bucketname+"/"+f.getOriginalFilename(),HttpStatus.OK);
		System.out.println(r.getBody());
		return new ResponseEntity<String>("https://s3.amazonaws.com/"+bucketname+"/"+f.getOriginalFilename(), HttpStatus.OK);
		
		
	}
}
