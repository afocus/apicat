package models

import (
	"time"
)

type ProjectGroups struct {
	ID           uint   `gorm:"type:bigint;primaryKey;autoIncrement"`
	UserID       uint   `gorm:"type:bigint;index;not null;comment:用户id"`
	Name         string `gorm:"type:varchar(255);not null;comment:分组名称"`
	DisplayOrder int    `gorm:"type:int(11);not null;default:0;comment:显示顺序"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func NewProjectGroups(ids ...uint) (*ProjectGroups, error) {
	pg := &ProjectGroups{}
	if len(ids) > 0 {
		if err := Conn.Take(pg, ids[0]).Error; err != nil {
			return pg, err
		}
		return pg, nil
	}
	return pg, nil
}

func (pg *ProjectGroups) List() ([]ProjectGroups, error) {
	var projectGroups []ProjectGroups
	return projectGroups, Conn.Where("user_id = ?", pg.UserID).Order("display_order asc").Find(&projectGroups).Error
}

func (pg *ProjectGroups) Create() error {
	return Conn.Create(pg).Error
}

func (pg *ProjectGroups) Delete() error {
	if err := Conn.Model(&ProjectMembers{}).Where("user_id = ? AND group_id = ?", pg.UserID, pg.ID).Update("group_id", 0).Error; err != nil {
		return err
	}

	return Conn.Delete(pg).Error
}

func (pg *ProjectGroups) Update() error {
	return Conn.Save(pg).Error
}

func GetProjectGroupDisplayOrder(userID uint) (int, error) {
	var projectGroup ProjectGroups
	if err := Conn.Where("user_id = ?", userID).Order("display_order desc").First(&projectGroup).Error; err != nil {
		return 0, err
	}
	return projectGroup.DisplayOrder, nil
}

func GetProjectGroupCountByName(userID uint, name string) (int64, error) {
	var count int64
	return count, Conn.Model(&ProjectGroups{}).Where("user_id = ? and name = ?", userID, name).Count(&count).Error
}

func GetProjectGroupCountExcludeTheID(userID uint, name string, id uint) (int64, error) {
	var count int64
	return count, Conn.Model(&ProjectGroups{}).Where("user_id = ? and name = ? and id != ?", userID, name, id).Count(&count).Error
}
