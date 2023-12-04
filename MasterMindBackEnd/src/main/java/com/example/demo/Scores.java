package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;
import java.time.LocalDate;


@Entity(name = "scores")
public class Scores {
  @Id
  Long id;

  String title;

  String player;

  int score;

  String userId;

  LocalDate date;

/**
 * constructor
 */
  public Scores(String title, String player, int score, String userId, LocalDate date) {
    this.title = title;
    this.player = player;
    this.score = score;
    this.userId = userId;
    this.date = date;
  }

  public long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return this.title;
  }


  public void setTitle(String title) {
    this.title = title;
  }


  /**
   * get userId method
   */
  public String getUserId() {
    return this.userId;
  }



  /**
   * set userId method
   */
  public void setUserId(String userId) {
    this.userId = userId;
  }



  /**
   * get player method
   */
  public String getPlayer() {
    return this.player;
  }

  /**
   * set player method
   */
  public void setPlayer(String player) {
    this.player = player;
  }

  /**
   * get score method
   */
  public int getscore() {
    return this.score;
  }

  /**
   * set score method
   */
  public void setscore(int score) {
    this.score = score;
  }

  /**
   * get Date method
   */
  public LocalDate getDate() {
    return this.date;
  }

  /**
   * setDate method
   */
  public void setDate(LocalDate date) {
    this.date = date;
  }

  /**
   * override toString method
   */
  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", title:'" + this.title + '\'' +
        ", Player:'" + this.player + '\'' +
        ", score:" + this.score +
        ", userId:'" + this.userId + '\'' +
        ", date:'" + this.date + '\'' +
        '}';
  }
}