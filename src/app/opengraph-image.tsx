import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Developer, Designer & Virtual Assistant`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. It deliberately mirrors the page it links to: white ground,
 * one blue rule, the name set large and tight, and the three lanes along the
 * bottom.
 *
 * Note: this renders in the default sans rather than Anton — ImageResponse needs
 * real font data, and Anton is only self-hosted at build time by next/font. To
 * match the hero exactly, drop an Anton .ttf into the project and pass it via
 * the `fonts` option below.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 999,
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            JY
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#2563EB",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              color: "#0F172A",
              textTransform: "uppercase",
            }}
          >
            Jaime Yee II
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: "#64748B",
              letterSpacing: "-0.01em",
            }}
          >
            IT Student · Developer &amp; Designer · Virtual Assistant
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, backgroundColor: "#2563EB", width: 180 }} />
          <div
            style={{
              display: "flex",
              gap: 56,
              marginTop: 26,
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#64748B",
            }}
          >
            <div style={{ display: "flex" }}>Build</div>
            <div style={{ display: "flex" }}>Design</div>
            <div style={{ display: "flex" }}>Support</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
