"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import { type CSSProperties, type FocusEvent, type KeyboardEvent, type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

import type { PortfolioMedia, PortfolioProject, PortfolioTab } from "@/lib/portfolio";

type PortfolioPreviewProps = {
  projects: PortfolioProject[];
  tabs: PortfolioTab[];
};

const PER_VIEW = 3;

export default function PortfolioPreview({ projects, tabs }: PortfolioPreviewProps) {
  const [activeTabId, setActiveTabId] = useState<PortfolioTab["id"]>(tabs[0]?.id ?? "virtual-assistant");
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const tabProjects = useMemo(
    () => projects.filter((project) => project.category === activeTabId),
    [projects, activeTabId],
  );

  const pageCount = getPreviewPageCount(tabProjects.length);

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

  function selectTab(tabId: PortfolioTab["id"]) {
    setActiveTabId(tabId);
    setPageIndex(0);
    setSelectedMediaIndex(0);
    setSelectedSlug(null);
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

    selectTab(nextTab.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`home-portfolio-tab-${nextTab.id}`)?.focus({ preventScroll: true });
    });
  }

  function canPlayPreview() {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function startPreview(event: FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) {
    if (!canPlayPreview()) return;

    const video = event.currentTarget.querySelector<HTMLVideoElement>(".portfolio-preview-card__video");
    if (!video) return;

    try {
      video.currentTime = 0;
    } catch {
      // Some browsers do not allow seeking before metadata is ready.
    }

    void video.play().catch(() => undefined);
  }

  function stopPreview(event: FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) {
    const video = event.currentTarget.querySelector<HTMLVideoElement>(".portfolio-preview-card__video");
    if (!video) return;

    video.pause();

    try {
      video.currentTime = 0;
    } catch {
      // Some browsers do not allow seeking before metadata is ready.
    }
  }

  return (
    <div className="portfolio-preview">
      <div aria-label="Portfolio categories" className="portfolio-tabs" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;

          return (
            <button
              aria-controls={`home-portfolio-panel-${tab.id}`}
              aria-selected={isActive}
              className="portfolio-tabs__tab"
              id={`home-portfolio-tab-${tab.id}`}
              key={tab.id}
              onClick={() => selectTab(tab.id)}
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

      <div className="portfolio-preview__slider" data-paginated={pageCount > 1 || undefined}>
        {pageCount > 1 ? (
          <button
            aria-label="Show previous portfolio projects"
            className="portfolio-preview__arrow portfolio-preview__arrow--prev"
            onClick={() => setPageIndex((current) => (current - 1 + pageCount) % pageCount)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
        ) : null}

        <div aria-live="polite" className="portfolio-preview__viewport" data-tab={activeTabId}>
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            const panelProjects = projects.filter((project) => project.category === tab.id);
            const panelPageCount = getPreviewPageCount(panelProjects.length);

            return (
              <div
                aria-hidden={!isActive}
                aria-labelledby={`home-portfolio-tab-${tab.id}`}
                className="portfolio-preview__panel"
                data-active={isActive || undefined}
                id={`home-portfolio-panel-${tab.id}`}
                key={tab.id}
                role="tabpanel"
                tabIndex={isActive ? 0 : -1}
              >
                <div
                  className="portfolio-preview__track"
                  style={{ "--page": isActive ? pageIndex : 0 } as CSSProperties}
                >
                  {Array.from({ length: panelPageCount }, (_, pageNumber) => (
                    <div
                      className={[
                        "portfolio-preview__page",
                        tab.id === "motion-videos" ? "portfolio-preview__page--motion" : "",
                        tab.id === "marketing-seo" ? "portfolio-preview__page--equal" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={pageNumber}
                    >
                      {panelProjects
                        .slice(pageNumber * PER_VIEW, pageNumber * PER_VIEW + PER_VIEW)
                        .map((project, index) =>
                          renderPreviewCard({
                            project,
                            index: pageNumber * PER_VIEW + index,
                            openProject,
                            startPreview,
                            stopPreview,
                          }),
                        )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {pageCount > 1 ? (
          <button
            aria-label="Show next portfolio projects"
            className="portfolio-preview__arrow portfolio-preview__arrow--next"
            onClick={() => setPageIndex((current) => (current + 1) % pageCount)}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        ) : null}
      </div>

      {pageCount > 1 ? (
        <div className="portfolio-preview__dots" role="tablist" aria-label="Portfolio pages">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              aria-label={`Go to portfolio page ${index + 1}`}
              aria-selected={index === pageIndex}
              className="portfolio-preview__dot"
              data-active={index === pageIndex || undefined}
              key={index}
              onClick={() => setPageIndex(index)}
              role="tab"
              type="button"
            />
          ))}
        </div>
      ) : null}

      <dialog
        aria-labelledby={selectedProject ? "home-portfolio-dialog-title" : undefined}
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
                  <h2 id="home-portfolio-dialog-title">{selectedProject.title}</h2>
                </div>
              </div>

              <p className="portfolio-dialog__summary">{selectedProject.summary}</p>

              {selectedProject.media.length > 1 ? (
                <div
                  className="portfolio-dialog__playlist"
                  aria-label={`${selectedProject.title} video playlist`}
                >
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
    </div>
  );
}

type RenderPreviewCardOptions = {
  index: number;
  openProject: (slug: string) => void;
  project: PortfolioProject;
  startPreview: (event: FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) => void;
  stopPreview: (event: FocusEvent<HTMLElement> | MouseEvent<HTMLElement>) => void;
};

function renderPreviewCard({
  index,
  openProject,
  project,
  startPreview,
  stopPreview,
}: RenderPreviewCardOptions) {
  const isMotion = project.category === "motion-videos";
  const isMarketing = project.category === "marketing-seo";

  return (
    <button
      aria-label={`Open details for ${project.title}`}
      className={[
        "portfolio-preview-card",
        isMotion ? "portfolio-preview-card--motion" : "",
        isMarketing ? "portfolio-preview-card--static" : "",
        project.featured ? "portfolio-preview-card--featured" : "",
        getProjectOrientation(project) === "landscape" ? "portfolio-preview-card--landscape" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-cinematic="rise"
      data-cinematic-delay={`${Math.min(index + 1, 6)}`}
      key={project.slug}
      onBlur={stopPreview}
      onFocus={startPreview}
      onClick={() => openProject(project.slug)}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      type="button"
    >
      <span
        className="portfolio-preview-card__media"
        data-orientation={getProjectOrientation(project)}
      >
        {renderPreviewCardMedia(project)}
        {isMotion ? (
          <span className="portfolio-preview-card__badges" aria-hidden="true">
            <span>{formatClipCount(project.media.length)}</span>
            {project.durationLabel ? <span>{project.durationLabel}</span> : null}
            {project.formatLabel ? <span>{project.formatLabel}</span> : null}
          </span>
        ) : null}
        {isMotion ? (
          <span className="portfolio-preview-card__motion-slate" aria-hidden="true">
            <span>{project.title}</span>
            {project.formatLabel ? <span>{project.formatLabel}</span> : null}
          </span>
        ) : null}
        {isMotion ? (
          <span className="portfolio-preview-card__play" aria-hidden="true">
            <Play size={18} />
          </span>
        ) : null}
      </span>

      <span className="portfolio-preview-card__body">
        {renderPreviewProjectLogo(project)}
        <span className="portfolio-preview-card__meta">
          <span className="portfolio-preview-card__title">{project.title}</span>
          <span className="portfolio-preview-card__summary">{project.summary}</span>
        </span>
        <span className="portfolio-preview-card__action">
          {isMotion ? "View reel" : "View case"}
          <ArrowRight aria-hidden="true" size={16} />
        </span>
      </span>
    </button>
  );
}

function renderPreviewCardMedia(project: PortfolioProject) {
  const firstMedia = project.media[0];

  if (firstMedia?.type === "video") {
    return (
      <video
        aria-hidden="true"
        className="portfolio-preview-card__video"
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
      <span className="portfolio-preview-card__static-logo" aria-hidden="true">
        {/* Plain img: marketing logos include SVGs, which the Next image optimizer does not serve. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
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
      unoptimized
    />
  );
}

function renderPreviewProjectLogo(project: PortfolioProject) {
  if (project.logo) {
    if (project.logo.src.endsWith(".svg")) {
      return (
        <span className="portfolio-preview-card__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={project.logo.alt}
            height={project.logo.height}
            src={project.logo.src}
            width={project.logo.width}
          />
        </span>
      );
    }

    return (
      <span className="portfolio-preview-card__logo">
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
    <span className="portfolio-preview-card__logo portfolio-preview-card__logo--text" aria-hidden="true">
      {getProjectMark(project.title)}
    </span>
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

function getPreviewPageCount(projectCount: number) {
  return Math.max(1, Math.ceil(projectCount / PER_VIEW));
}
