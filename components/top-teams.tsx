import { TrendingUp, TrendingDown } from "lucide-react"

type Team = {
  rank: number
  name: string
  value: string
  change: number
}

const teams: Team[] = [
  { rank: 1, name: "Team Vitality", value: "$4.8M", change: 3.2 },
  { rank: 2, name: "G2 Esports", value: "$4.1M", change: 1.4 },
  { rank: 3, name: "Natus Vincere", value: "$3.9M", change: -0.8 },
  { rank: 4, name: "FaZe Clan", value: "$3.2M", change: 2.1 },
  { rank: 5, name: "Spirit", value: "$2.7M", change: 5.6 },
]

export function TopTeams() {
  return (
    <div className="w-full rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between px-1">
        <h2 className="font-display text-lg font-bold uppercase tracking-wide">
          Топ-5 команд
        </h2>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          30.06.2026
        </span>
      </div>

      <ul className="flex flex-col divide-y divide-border/60">
        {teams.map((team) => (
          <li
            key={team.rank}
            className="flex items-center gap-3 py-3 px-1 transition-colors hover:bg-secondary/40 rounded-lg"
          >
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-bold ${
                team.rank === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {team.rank}
            </span>
            <span className="flex-1 truncate text-sm font-medium">{team.name}</span>
            <span className="font-mono text-sm font-semibold text-foreground">
              {team.value}
            </span>
            <span
              className={`flex w-16 shrink-0 items-center justify-end gap-1 pr-1 font-mono text-xs ${
                team.change >= 0 ? "text-primary" : "text-destructive"
              }`}
            >
              {team.change >= 0 ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {team.change >= 0 ? "+" : "-"}{Math.abs(team.change)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}