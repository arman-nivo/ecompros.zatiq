"use client";

import { ArrowRight, Play, X } from "lucide-react";
import Image from "next/image";
import {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { PortfolioMedia, PortfolioProject, PortfolioTab } from "@/lib/portfolio";

type PortfolioShowcaseProps = {
  projects: PortfolioProject[];
  tabs: PortfolioTab[];
};

export default function PortfolioShowcase({ projects, tabs }: PortfolioShowcaseProps) {
  const [activeTabId, setActiveTabId] = useState<PortfolioTab["id"]>(tabs[0]?.id ?? "virtual-assistant");
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === selectedSlug) ?? null,
    [projects, selectedSlug],
  );
  const selectedMedia = selectedProject?.media[selectedMediaIndex] ?? selectedProject?.media[0] ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!selectedProject && dialog.open) {
      dialog.close();
    }
  }, [selectedProject]);

  function openProject(slug: string) {
    setSelectedMediaIndex(0);
    setSelectedSlug(slug);
  }

  function closeProject() {
    setSelectedMediaIndex(0);
    setSelectedSlug(null);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const lastIndex = tabs.length - 1;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;

    setActiveTabId(nextTab.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`portfolio-tab-${nextTab.id}`)?.focus({ preventScroll: true });
    });
  }

  function canPlayPreview() {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function startPreview(event: FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) {
    if (!canPlayPreview()) return;

    const video = event.currentTarget.querySelector<HTMLVideoElement>(".portfolio-card__preview-video");
    if (!video) return;

    try {
      video.currentTime = 0;
    } catch {
      // Some browsers do not allow seeking before metadata is ready.
    }

    void video.play().catch(() => undefined);
  }

  function stopPreview(event: FocusEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) {
    const video = event.currentTarget.querySelector<HTMLVideoElement>(".portfolio-card__preview-video");
    if (!video) return;

    video.pause();

    try {
      video.currentTime = 0;
    } catch {
      // Some browsers do not allow seeking before metadata is ready.
    }
  }

  return (
    <section className="portfolio-showcase section" aria-labelledby="portfolio-showcase-title">
      <div className="portfolio-showcase__inner">
        <div className="portfolio-showcase__head">
          <div>
            <p className="section__label" data-cinematic="rise">
              Portfolio index
            </p>
            <h2
              className="section__title"
              data-cinematic="clip"
              data-cinematic-delay="1"
              id="portfolio-showcase-title"
            >
              Work grouped by what the client needed to operate.
            </h2>
          </div>
          <div
            aria-label="Portfolio categories"
            className="portfolio-tabs"
            data-cinematic="rise"
            data-cinematic-delay="2"
            role="tablist"
          >
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id;

              return (
                <button
                  aria-controls={`portfolio-panel-${tab.id}`}
                  aria-selected={isActive}
                  className="portfolio-tabs__tab"
                  id={`portfolio-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  onKeyDown={handleTabKeyDown}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="portfolio-panels">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            const tabProjects = projects.filter((project) => project.category === tab.id);

            return (
              <div
                aria-hidden={!isActive}
                aria-labelledby={`portfolio-tab-${tab.id}`}
                className="portfolio-panel"
                data-active={isActive || undefined}
                id={`portfolio-panel-${tab.id}`}
                key={tab.id}
                role="tabpanel"
                tabIndex={isActive ? 0 : -1}
              >
                {tabProjects.length > 0 ? (
                  <>
                    {tab.description ? (
                      <p className="portfolio-panel__intro" data-cinematic="rise">
                        {tab.description}
                      </p>
                    ) : null}
                    <div className={`portfolio-grid${tab.id === "motion-videos" ? " portfolio-grid--motion" : ""}${tab.id === "marketing-seo" ? " portfolio-grid--equal" : ""}`}>
                      {tabProjects.map((project, index) => (
                        <article
                          className={[
                            "portfolio-card",
                            project.category === "motion-videos" ? "portfolio-card--motion" : "",
                            project.category === "marketing-seo" ? "portfolio-card--static" : "",
                            project.featured ? "portfolio-card--featured" : "",
                            getProjectOrientation(project) === "landscape" ? "portfolio-card--landscape" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          data-cinematic="rise"
                          data-cinematic-delay={`${Math.min(index + 1, 6)}`}
                          key={project.slug}
                        >
                          <button
                            aria-label={`Open details for ${project.title}`}
                            className="portfolio-card__button"
                            onBlur={stopPreview}
                            onClick={() => openProject(project.slug)}
                            onFocus={startPreview}
                            onMouseEnter={startPreview}
                            onMouseLeave={stopPreview}
                            type="button"
                          >
                            <span
                              className="portfolio-card__media"
                              data-orientation={getProjectOrientation(project)}
                            >
                              {renderCardMedia(project)}
                              {project.category === "motion-videos" ? (
                                <span className="portfolio-card__badges" aria-hidden="true">
                                  <span>{formatClipCount(project.media.length)}</span>
                                  {project.durationLabel ? <span>{project.durationLabel}</span> : null}
                                  {project.formatLabel ? <span>{project.formatLabel}</span> : null}
                                </span>
                              ) : null}
                              {project.category === "motion-videos" ? (
                                <span className="portfolio-card__motion-slate" aria-hidden="true">
                                  <span>{project.title}</span>
                                  {project.formatLabel ? <span>{project.formatLabel}</span> : null}
                                </span>
                              ) : null}
                              {project.category === "motion-videos" ? (
                                <span className="portfolio-card__play" aria-hidden="true">
                                  <Play size={18} />
                                </span>
                              ) : null}
                            </span>
                            <span className="portfolio-card__body">
                              {renderProjectLogo(project)}
                              <span className="portfolio-card__meta">
                                <span className="portfolio-card__title">{project.title}</span>
                                <span className="portfolio-card__summary">{project.summary}</span>
                              </span>
                              <span className="portfolio-card__action">
                                {project.category === "motion-videos" ? "View reel" : "View case"}
                                <ArrowRight aria-hidden="true" size={16} />
                              </span>
                            </span>
                          </button>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="portfolio-empty" data-cinematic="rise">
                    <p>{tab.emptyState}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <dialog
        aria-labelledby={selectedProject ? "portfolio-dialog-title" : undefined}
        className="portfolio-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeProject();
          }
        }}
        onClose={closeProject}
        ref={dialogRef}
      >
        {selectedProject ? (
          <div className="portfolio-dialog__surface">
            <button
              aria-label="Close portfolio details"
              className="portfolio-dialog__close"
              onClick={closeProject}
              type="button"
            >
              <X aria-hidden="true" size={20} />
            </button>

            {selectedMedia ? (
              <div
                className="portfolio-dialog__video"
                data-media-type={selectedMedia.type}
                data-orientation={selectedMedia.type === "video" ? selectedMedia.orientation : "landscape"}
              >
                {renderDialogMedia(selectedMedia, selectedProject.cover)}
              </div>
            ) : null}

            <div className="portfolio-dialog__content">
              <div className="portfolio-dialog__top">
                <div>
                  <p className="section__label">
                    {selectedProject.category === "motion-videos" ? "Motion detail" : "Case detail"}
                  </p>
                  <h2 id="portfolio-dialog-title">{selectedProject.title}</h2>
                </div>
              </div>

              <p className="portfolio-dialog__summary">{selectedProject.summary}</p>

              {selectedProject.media.length > 1 ? (
                <div className="portfolio-dialog__playlist" aria-label={`${selectedProject.title} video playlist`}>
                  {selectedProject.media.map((media, index) => (
                    <button
                      aria-pressed={selectedMediaIndex === index}
                      className="portfolio-dialog__playlist-item"
                      data-active={selectedMediaIndex === index || undefined}
                      key={media.title}
                      onClick={() => setSelectedMediaIndex(index)}
                      type="button"
                    >
                      <span>{media.title}</span>
                      {media.type === "video" ? <span>{media.durationLabel}</span> : null}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="portfolio-dialog__body">
                {selectedProject.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="portfolio-dialog__lists">
                <div>
                  <h3>Services</h3>
                  <ul>
                    {selectedProject.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{selectedProject.stackLabel ?? "Stack"}</h3>
                  <ul>
                    {selectedProject.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

function renderCardMedia(project: PortfolioProject) {
  const firstMedia = project.media[0];

  if (firstMedia?.type === "video") {
    return (
      <video
        aria-hidden="true"
        className="portfolio-card__preview-video"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={firstMedia.src} type="video/mp4" />
      </video>
    );
  }

  if (project.category === "marketing-seo" && project.logo) {
    return (
      <span className="portfolio-card__static-logo" aria-hidden="true">
        {/* Plain img: the marketing logos include SVGs, which the Next image optimizer does not serve. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="eager"
          alt=""
          height={project.logo.height}
          src={project.logo.src}
          width={project.logo.width}
        />
      </span>
    );
  }

  if (!project.cover) return null;

  return (
    <Image
      alt={project.cover.alt}
      fill
      sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 959px) calc((100vw - 3rem) / 2), 30vw"
      src={project.cover.src}
    />
  );
}

function renderDialogMedia(media: PortfolioMedia, cover?: PortfolioProject["cover"]) {
  if (media.type === "youtube") {
    if (!cover) return null;

    return <Image alt={cover.alt} fill sizes="(max-width: 767px) 100vw, 48rem" src={cover.src} />;
  }

  return (
    <video
      className="portfolio-dialog__native-video"
      controls
      key={media.src}
      playsInline
      preload="metadata"
    >
      <source src={media.src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function renderProjectLogo(project: PortfolioProject) {
  if (project.logo) {
    // Plain img for SVGs (marketing logos): the Next image optimizer does not serve SVG.
    if (project.logo.src.endsWith(".svg")) {
      return (
        <span className="portfolio-card__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            loading="eager"
            alt={project.logo.alt}
            height={project.logo.height}
            src={project.logo.src}
            width={project.logo.width}
          />
        </span>
      );
    }

    return (
      <span className="portfolio-card__logo">
        <Image
          alt={project.logo.alt}
          height={project.logo.height}
          src={project.logo.src}
          width={project.logo.width}
        />
      </span>
    );
  }

  return (
    <span className="portfolio-card__logo portfolio-card__logo--text" aria-hidden="true">
      {getProjectMark(project.title)}
    </span>
  );
}

function getProjectMark(title: string) {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function getProjectOrientation(project: PortfolioProject) {
  const firstMedia = project.media[0];

  if (firstMedia?.type === "video") {
    return firstMedia.orientation;
  }

  return "landscape";
}

function formatClipCount(count: number) {
  return `${count} ${count === 1 ? "clip" : "clips"}`;
}
