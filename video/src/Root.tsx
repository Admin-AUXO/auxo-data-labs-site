import { Composition } from "remotion";
import cues from "./cues.json";
import { Film } from "./scenes/Film";
import { Terrain } from "./scenes/Terrain";

export const Root: React.FC = () => (
  <>
    <Composition id="Terrain" component={Terrain} fps={cues.fps} durationInFrames={cues.hero.frames} width={1080} height={1080} />
    <Composition id="TerrainAudio" component={Terrain} defaultProps={{ audio: true }} fps={cues.fps} durationInFrames={cues.hero.frames} width={1080} height={1080} />
    <Composition id="Film" component={Film} defaultProps={{ audio: false }} fps={cues.fps} durationInFrames={cues.film.frames} width={1920} height={1080} />
    <Composition id="FilmAudio" component={Film} defaultProps={{ audio: true }} fps={cues.fps} durationInFrames={cues.film.frames} width={1920} height={1080} />
  </>
);
