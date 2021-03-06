package models

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"nosql2h19-clothes/backend/utils"
)

type Group struct {
	//Id         string `json:"id"`
	Clothes   []Cloth
	Date      string `json:"date"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
	PlaceName string `json:"placeName"`
}

func GetGroups(un string) []Group {
	u := GetUserByUserName(un)
	cs := u.Groups
	return cs
}

func AddGroup(un string, c Group) bool {
	u := GetUserByUserName(un)
	updateResult, err := USERS.UpdateOne(context.TODO(), bson.D{{"_id", u.Id}}, bson.D{{"$addToSet", bson.D{{"groups", c}}}})
	utils.CheckErr(err)
	fmt.Println("update result: ", updateResult)
	return true
}

func PrintGroups(c []Group) {
	for i := range c {
		print(c[i].Date, " ", c[i].PlaceName, "\n")
	}
}

func DeleteGroup(un string, cl string) bool {
	u := GetUserByUserName(un)
	c := GetGroupByStartTime(un, cl)
	updateResult, err := USERS.UpdateOne(context.TODO(), bson.D{{"_id", u.Id}}, bson.D{{"$pull", bson.D{{"groups", c}}}})
	utils.CheckErr(err)
	fmt.Println("update result: ", updateResult)
	return true
}

func GetGroupByDate(un string, s string) []Group {
	u := GetUserByUserName(un)
	cs := u.Groups
	var res []Group
	fmt.Println("run")
	for _, i := range cs {
		if i.Date == s {
			res = append(res, i)
		}
	}
	fmt.Println(res)
	return res
}

func GetGroupByStartTime(un string, s string) Group {
	u := GetUserByUserName(un)
	cs := u.Groups
	var res Group
	for _, i := range cs {
		if i.StartTime == s {
			res = i
		}
	}
	return res
}
