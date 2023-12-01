package com.example.demo;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

@Entity(name = "scores")
public class Scores {
  @Id
  Long id;

  String title;

  String player;

  int score;

  public Scores(String title, String player, int score) {
    this.title = title;
    this.player = player;
    this.score = score;
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

  public String getPlayer() {
    return this.player;
  }

  public void setPlayer(String player) {
    this.player = player;
  }

  public int getscore() {
    return this.score;
  }

  public void setscore(int score) {
    this.score = score;
  }

  @Override
  public String toString() {
    return "{" +
        "id:" + this.id +
        ", title:'" + this.title + '\'' +
        ", Player:'" + this.player + '\'' +
        ", score:" + this.score +
        '}';
  }
}