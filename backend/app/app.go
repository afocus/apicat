package app

import (
	"strconv"

	"github.com/apicat/apicat/backend/app/router"
	"github.com/apicat/apicat/backend/config"
	"github.com/gin-gonic/gin"
)

func Run() {
	gin.SetMode(gin.DebugMode)

	r := gin.New()
	r.ContextWithFallback = true

	router.InitApiRouter(r)
	r.Run(config.SysConfig.App.Host + ":" + strconv.Itoa(config.SysConfig.App.Port))
}
