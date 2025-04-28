{{- define "task-manager.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "task-manager.fullname" .) .Values.serviceAccount.name }}
{{- else }}
default
{{- end }}
{{- end }}
