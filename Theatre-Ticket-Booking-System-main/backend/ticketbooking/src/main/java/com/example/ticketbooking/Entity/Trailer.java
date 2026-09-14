package com.example.ticketbooking.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Trailers")
public class Trailer {

    @Id
    private String id;
    private String title;
    private String image;
    private String videoUrl;

    public Trailer() {
    }

    public Trailer(String title, String image, String videoUrl) {
        this.title = title;
        this.image = image;
        this.videoUrl = videoUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
