import { Config } from "@remotion/cli/config";

Config.setChromiumOpenGlRenderer("angle");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setConcurrency(6);
Config.setX264Preset("veryfast");
