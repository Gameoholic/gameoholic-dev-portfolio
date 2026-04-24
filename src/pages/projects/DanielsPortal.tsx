import MediaPreview from "../../components/MediaPreview";

interface MediaItem {
    src: string;
    type: "image" | "video";
    caption: string;
}

export default function DanielsPortalProject() {
    const TECH = [
        "Next.js",
        "PostgreSQL",
        "React",
        "TailwindCSS",
        "bcrypt",
        "Resend",
        "shadcn/ui",
    ];

    const CREDENTIALS = [
        { role: "Guest", username: "guest", password: "guest" },
        { role: "Admin", username: "admin", password: "admin" },
    ];

    const tourVideo: MediaItem = {
        src: "/daniels_portal_tour.mp4",
        type: "video",
        caption: "Website tour",
    };

    const issueCodeImage: MediaItem = {
        src: "/portal_issue_account_creation_code_prompt.png",
        type: "image",
        caption: "Issuing an account creation code",
    };
    const invitationEmail: MediaItem = {
        src: "/email_invitation_to_join_portal.png",
        type: "image",
        caption:
            "Email invitation sent to the new user with their creation code",
    };
    const accountCreatedEmail: MediaItem = {
        src: "/portal_account_account_created_email.png",
        type: "image",
        caption: "Confirmation email sent to the user after account creation",
    };
    const issuerNotificationEmail: MediaItem = {
        src: "/portal_account_creation_code_issuer_code_used_email.png",
        type: "image",
        caption:
            "Notification email sent to the issuer when their code is used",
    };
    const userManagementImage: MediaItem = {
        src: "/portal_user_management_screen.png",
        type: "image",
        caption: "User management panel (permissions section)",
    };
    const securitySettingsImage: MediaItem = {
        src: "/user_settings_security_page.png",
        type: "image",
        caption:
            "User security settings with token expiry and session controls",
    };
    const sudoScriptVideo: MediaItem = {
        src: "/portal_root_user_utility_script.mp4",
        type: "video",
        caption: "Utility script creating the initial SUDO admin account",
    };

    return (
        <div className="max-w-4xl space-y-10">
            <MediaPreview src={tourVideo.src} type={tourVideo.type} />

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    About
                </h2>
                <p className="font-body mb-4 text-lg leading-relaxed text-stone-400">
                    I wanted to actually understand auth and security by
                    building it myself. The goal was a system with zero client
                    trust, fine-grained permission control, and full user
                    control over every aspect of their account security. 100%
                    transparency, unlike most modern SaaS websites.
                </p>
                <p className="font-body mb-6 text-lg leading-relaxed text-stone-400">
                    This project is still a work in progress and currently on
                    hold due to its scope, so expect placeholders and incomplete
                    pages. With that said, I've created some throwaway accounts
                    for you to explore the existing features. Since anyone can
                    log in, keep in mind others may have messed with the
                    permissions and settings.
                </p>
                <div className="space-y-4 border border-stone-700 bg-stone-900/50 p-5">
                    <p className="font-mono text-xs tracking-widest text-amber-400 uppercase">
                        Demo Credentials
                    </p>
                    {CREDENTIALS.map((c) => (
                        <div key={c.role} className="space-y-1">
                            <p className="font-mono text-xs tracking-widest text-stone-500 uppercase">
                                {c.role}
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <span className="font-mono text-sm text-stone-300">
                                    Username: {c.username}
                                </span>
                                <span className="font-mono text-sm text-stone-300">
                                    Password: {c.password}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-display mb-6 text-2xl font-black text-stone-100">
                    Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                    {TECH.map((t) => (
                        <span
                            key={t}
                            className="border border-stone-700 bg-stone-800 px-3 py-1.5 font-mono text-xs text-stone-300"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-display mb-4 text-2xl font-black text-stone-100">
                    Features
                </h2>
                <div className="space-y-6">
                    {[
                        {
                            title: "Invite-only account creation",
                            description: (
                                <>
                                    There's no self-registration. To create an
                                    account, an admin issues an account creation
                                    code tied to a specific email address, a set
                                    of permissions, and a default token expiry.
                                    The code is single-use, email-locked (it
                                    can't be forwarded to someone else and used
                                    on a different email), and expires after a
                                    set time.
                                    <br />
                                    <br />
                                    When someone uses the code, both they and
                                    the issuer receive an email with the full
                                    account details. This gives me complete
                                    control over who gets in and what they can
                                    do from the moment their account exists.
                                </>
                            ),
                            media: [
                                issueCodeImage,
                                invitationEmail,
                                accountCreatedEmail,
                                issuerNotificationEmail,
                            ],
                        },
                        {
                            title: "Per-app permission model",
                            description: (
                                <>
                                    Permissions are granular and per-resource,
                                    not role-based. Each app in the portal
                                    (bookkeeping, gym tracker, time management,
                                    etc.) has its own permission, and admin
                                    capabilities are further broken down into
                                    specific actions like managing access
                                    tokens, deleting users, or issuing creation
                                    codes.
                                    <br />
                                    <br />
                                    If I want to give my mom access to just the
                                    shopping list app and nothing else, I can do
                                    that. The admin panel within the account
                                    creation code issuing also lets me set her
                                    token expiry to 30 days instead of the 3
                                    days I'd use for myself, since I know she'd
                                    struggle with frequent re-logins.
                                    <br />
                                    <br />
                                    How does the sysadmin set up the initial
                                    account, you might ask? There's a utility
                                    script that creates an initial{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        SUDO
                                    </code>{" "}
                                    admin account with all permissions unlocked.
                                </>
                            ),
                            media: [userManagementImage, sudoScriptVideo],
                        },
                        {
                            title: "Access tokens over JWTs",
                            description: (
                                <>
                                    For this project I chose access tokens
                                    stored in the database over JWTs. JWTs trade
                                    security for performance. With JWTs, a
                                    compromised session can't be revoked until
                                    the token naturally expires, typically 5 to
                                    15 minutes. In a personal system that might
                                    host my house's surveillance cameras or a private email
                                    client, that time window is unacceptable, I
                                    need to be able to kill a session
                                    immediately.
                                    <br />
                                    <br />
                                    Furthermore, the performance argument for
                                    JWTs (skipping a database lookup per
                                    request) doesn't apply here, this isn't
                                    Netflix-scale traffic and there's no
                                    horizontal scaling needed. Every request
                                    validates the token against the database,
                                    which also lets me track last-use
                                    timestamps, enforce maximum concurrent
                                    sessions, and auto-revoke the oldest tokens
                                    when the (optional, user-configurable) limit
                                    is exceeded.
                                </>
                            ),
                            media: [],
                        },
                        {
                            title: "Zero client trust and server-side ownership validation",
                            description: (
                                <>
                                    Every server action re-verifies
                                    authentication and checks that the requested
                                    data actually belongs to the authenticated
                                    user. Passing middleware isn't enough. For
                                    example, if a user is authenticated and
                                    somehow acquires another user's expense ID,
                                    the server action won't just check that the
                                    token is valid, it also confirms the expense
                                    belongs to the token's owner.
                                    <br />
                                    <br />
                                    The client only ever receives the minimum
                                    data it needs, with server types mapped to
                                    separate, minimized client-facing interfaces
                                    before anything leaves the server. This
                                    makes the API logic more complex, but it
                                    addresses authorization bugs that most
                                    projects like this skip entirely.
                                </>
                            ),
                            media: [],
                        },
                        {
                            title: "Compile-time enforced data access layer",
                            description: (
                                <>
                                    All database queries live in an{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        _internal
                                    </code>{" "}
                                    folder and require a{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        DALScope
                                    </code>{" "}
                                    parameter to execute, a compile-time type
                                    using TypeScript's{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        unique symbol
                                    </code>{" "}
                                    that can only be constructed inside the data
                                    access layer. This means it's impossible for
                                    a developer to accidentally call a raw
                                    database query from a server action or
                                    component, the code simply won't compile.
                                    <br />
                                    <br />
                                    Authenticated queries go through{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        executeDatabaseQuery
                                    </code>{" "}
                                    which validates the token and resolves user
                                    IDs automatically via a special symbol (
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        GET_USER_ID_FROM_ACCESS_TOKEN
                                    </code>
                                    ), and a separate{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        tokenless_executeDatabaseQuery
                                    </code>{" "}
                                    path exists for the handful of operations
                                    that genuinely can't have a token yet, like
                                    login and account creation. The separation
                                    is enforced at the type level, not by
                                    convention.
                                </>
                            ),
                            media: [],
                        },
                        {
                            title: "General account security features",
                            description: (
                                <>
                                    Passwords are hashed with{" "}
                                    <code className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-sm text-amber-200">
                                        bcrypt
                                    </code>{" "}
                                    using configurable salt rounds. Login
                                    responses are deliberately identical whether
                                    the username exists or not, and the server
                                    hashes the provided password even on a
                                    failed username lookup to prevent timing
                                    attacks that could reveal which accounts
                                    exist.
                                    <br />
                                    <br />
                                    Access tokens are never exposed in the admin
                                    panel, only an unrelated alias string is
                                    shown, so even admins with user management
                                    permissions can't hijack sessions.
                                    <br />
                                    <br />
                                    Anything with a lifecycle, whether it's an
                                    access token or an account creation code,
                                    tracks how and why it was invalidated,
                                    distinguishing between expiration, manual
                                    revocation, and automatic policy
                                    enforcement.
                                    <br />
                                    <br />
                                    Emails are censored in the UI.
                                </>
                            ),
                            media: [securitySettingsImage],
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="border-l-4 border-amber-400/40 pl-6"
                        >
                            <h3 className="font-display mb-1 text-lg font-black text-stone-200">
                                {feature.title}
                            </h3>
                            <p className="font-body text-lg leading-relaxed text-stone-400">
                                {feature.description}
                            </p>
                            {feature.media.length > 0 && (
                                <div
                                    className={`mt-4 grid gap-3 ${feature.media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
                                >
                                    {feature.media.map((item) => (
                                        <MediaPreview
                                            src={item.src}
                                            type={item.type}
                                            caption={item.caption}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
