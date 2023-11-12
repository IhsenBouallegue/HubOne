"use client";

export function Background({ className }: { className?: string }) {
  return (
    <div style={styles.backgroundMain} className={className}>
      <div style={styles.backgroundMainBefore} />
      <div style={styles.backgroundMainAfter} />
      <div style={styles.backgroundContent} />
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/80 to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/80 to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  backgroundMain: {
    width: "100vw",
    minHeight: "100vh",
    position: "absolute",
    zIndex: -10,
    display: "flex",
    justifyContent: "center",
    padding: "120px 24px 160px 24px",
    pointerEvents: "none",
  },
  backgroundMainBefore: {
    background: "radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 150%)",
    position: "absolute",
    content: '""',
    zIndex: 2,
    width: "100%",
    height: "100%",
    top: 0,
  },
  backgroundMainAfter: {
    content: '""',
    backgroundImage: "url(bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "blur(5px)",
    // backgroundImage: "url(https://d2vwwcvoksz7ty.cloudfront.net/grid.svg)",
    // filter: "invert(1)",
    zIndex: -8,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    opacity: 0.3,
  },
  backgroundContent: {
    zIndex: -7,
    width: "100%",
    maxWidth: "640px",
    backgroundImage: `radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%), 
                      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
                      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
                      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
                      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
                      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)`,
    position: "absolute",
    height: "100%",
    filter: "blur(100px) saturate(150%)",
    top: "80px",
    opacity: 0.15,
  },
};
